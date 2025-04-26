# Write Sense Introduction
Write Sense is an app that assists visually impaired users in writing and note-taking through voice recognition technology. With fast and accurate speech-to-text conversion, it enables users to create content effortlessly without needing to look at the screen. Additionally, Write Sense is a valuable tool for anyone who wants a hands-free writing experience, quick note-taking, or voice-based content creation.

![1](https://github.com/AI4LI-Language/write-sense/blob/main/demo.png)

Currently, Write Sense only supports Vietnamese users. But all the texts are written in English simply because ....
# Releases
Since the app is still in its very early phase, we’re not tracking any version yet.

# How to install
We’ve kept the demo as straightforward as possible by building a simple web app that streams audio via sockets to our backend for processing. The backend converts the incoming audio into text and sends it back to the frontend, and it also supports text-to-speech, returning audio signals that the frontend plays aloud.

First, make sure you have Python and pip installed on your system. Then, in your project directory, install the required packages:
```
pip install -r requirements.txt 
```
To run the demo, start the backend:
```
python backend.py
```
Finally, open the frontend script (website.html) in your favorite browser.
# How to use
As of May 1, 2025, Write Sense offers only basic features:
- Any speech you say will be displayed on the screen.
- To move between pages, just say "cờ tờ trờ" ("chuyển trang trước") or "cờ tờ sờ" ("chuyển trang sau"). These texts won't appear on screen.
