#! /usr/bin/env python

import threading
import subprocess
import time
import os

PORT=4747

def MainServer():
    while True:

        with subprocess.Popen(["python", "-m", "http.server", "--directory=" + os.getcwd(), str(PORT)], stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE) as process:
            stdout, stderr = map(lambda x: x.decode("utf-8"), process.communicate());
            print(stdout, stderr, process.pid);

        time.sleep(2.5);


def WebView():
    while True:

        with subprocess.Popen(["bash", "demon.webview.sh", str(PORT)], stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE) as process:
            stdout, stderr = map(lambda x: x.decode("utf-8"), process.communicate());
            print(stdout, stderr, process.pid);

        time.sleep(2.5);

if str(__name__).upper() in ["__MAIN__"]:
    server = threading.Thread(target=MainServer);
    webview = threading.Thread(target=WebView);
    server.start();
    webview.start();
    server.join();
    webview.join();
