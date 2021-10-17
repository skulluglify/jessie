#! /usr/bin/env python

import threading
import subprocess
import time
import os
import sys

PORT = str(os.getenv("PORT") or 4747)

def MainServer():
    with subprocess.Popen(["python", "-m", "http.server", "--directory={dir}".format(dir="./static"), PORT], stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE) as process:
        stdout, stderr = map(lambda x: x.decode("utf-8"), process.communicate());
        print(stdout, stderr, process.pid);

def WebView():
    while True:
        with subprocess.Popen(["bash", "demon.webview.sh", PORT], stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE) as process:
            stdout, stderr = map(lambda x: x.decode("utf-8"), process.communicate());
            sys.stdout.write("\rstdout {stdout:s} stderr {stderr:s} pid {pid:d}".format(
                stdout = stdout, stderr = stderr, pid = process.pid
            ));
        time.sleep(2);

if str(__name__).upper() in ["__MAIN__"]:
    server = threading.Thread(target=MainServer);
    webview = threading.Thread(target=WebView);
    server.start();
    webview.start();
    server.join();
    webview.join();
