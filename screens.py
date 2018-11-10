#!/usr/bin/python3
'''
Screens.py uses youtube-dl to download videos, omxplayer to play them, and feh to show images. These should be preinstalled.
'''
import argparse
import hashlib
import time
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

class OutDatedConfigException(Exception):
	pass

def md5(fname):
	if not os.path.exists(fname):
		return False

	hash_md5 = hashlib.md5()
	with open(fname, "rb") as f:
		for chunk in iter(lambda: f.read(4096), b""):
			hash_md5.update(chunk)
	return hash_md5.hexdigest()

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

def digestConfig(configFile, configDateFile):
	players = {
		"youtube": playVideo,
		"image": playImage
 	}
	with open(configFile, "r") as configFp:
		config = json.load(configFp)
	
	with open(configDateFile, "r") as configDate:
		lastConfigDate = configDate.read()

	for element in itertools.cycle(config):
		players[element["type"]](**element)
		
		# finish looping once each day so we can update configs
		if lastConfigDate < time.time() - 86400:
			raise OutDatedConfigException(lastConfigDate)

def grabAssets(configFile):
	grabbers = {
		"youtube": getVideoUrl,
		"image": getImage
 	}
	with open(configFile, "r") as configFp:
		config = json.load(configFp)
		for element in config:
			grabbers[element["type"]](**element)

def checkForNewConfig(configUrl, configFile, configDateFile):
	oldHash = md5(configFile)
	updateConfig(configUrl, configFile)
	newHash = md5(configFile)
	if oldHash != newHash:
		grabAssets(configFile)

	# store current time
	with open(configDateFile, "w") as configDate:
		configDate.write(time.time())

def main(basePath, configUrl):
	os.chdir(basePath)
	configFile = "config.json"
	configDateFile = ".lastupdated"

	try:
		checkForNewConfig(configUrl, configFile, configDateFile)
		digestConfig(configFile, configDateFile)
	except OutDatedConfigException:
		main(basePath, configUrl)

if __name__ == "__main__":
	parser = argparse.ArgumentParser(description='Loop images and youtube videos on your screen')
	parser.add_argument('config', help='Where to read the config from')
	args = parser.parse_args()

	basePath = user_data_dir(appname, appauthor)
	if not os.path.exists(basePath):
		os.makedirs(basePath)
	print("Data directory is {}".format(basePath))

	main(basePath, args.config)
