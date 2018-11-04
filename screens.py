#!/usr/bin/python3
import argparse
from appdirs import user_data_dir
import os
import json
import itertools
import subprocess
from urllib import request
from time import sleep

pathToUrl = {}

appname = "Rotating Screens"
appauthor = "Fontanus"

def _getVideoUrl(videoId):
	print("Grabbing youtube video url for {}".format(videoId))
	p = subprocess.run(["youtube-dl", "--id", "-q", "https://www.youtube.com/watch?v=" + videoId], stdout=subprocess.PIPE, universal_newlines=True)
	print("Video download finished")

def _getImage(src):
	print("Grabbing image {}".format(src))
	request.urlretrieve(src, src.split('/')[-1])

def getImage(src, **kwargs):
	if not os.path.exists(src.split('/')[-1]):
		_getImage(src)
	return src.split('/')[-1]
	
def getVideoUrl(videoId, **kwargs):
	if not os.path.exists('{}.mp4'.format(videoId)):
		_getVideoUrl(videoId)
	return '{}.mp4'.format(videoId)

def playVideo(videoId, **kwargs):
	url = getVideoUrl(videoId)
	p = subprocess.Popen(["omxplayer", "-b", url])
	while True:
		if p.poll() is not None:
			break
	
def playImage(src, timeOut, **kwargs):
	src = getImage(src)
	p = subprocess.Popen(["feh", "-x", "-F", src])
	sleep(timeOut)
	p.terminate()

def updateConfig(configUrl, configFile):
	request.urlretrieve(configUrl, configFile)

def digestConfig(configFile):
	players = {
		"youtube": playVideo,
		"image": playImage
 	}
	with open(configFile, "r") as configFp:
		config = json.load(configFp)
		for element in itertools.cycle(config):
			players[element["type"]](**element)

def grabAssets(configFile):
	grabbers = {
		"youtube": getVideoUrl,
		"image": getImage
 	}
	with open(configFile, "r") as configFp:
		config = json.load(configFp)
		for element in config:
			grabbers[element["type"]](**element)

def main(basePath, configUrl):
	configFile = "config.json"
	os.chdir(basePath)
	updateConfig(configUrl, configFile)
	grabAssets(configFile)
	digestConfig(configFile)

if __name__ == "__main__":
	parser = argparse.ArgumentParser(description='Loop images and youtube videos on your screen')
	parser.add_argument('config', help='Where to read the config from')
	args = parser.parse_args()

	basePath = user_data_dir(appname, appauthor)
	if not os.path.exists(basePath):
		os.makedirs(basePath)
	print("Data directory is {}".format(basePath))

	main(basePath, args.config)
