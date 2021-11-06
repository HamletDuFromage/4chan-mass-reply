#!/usr/bin/env python3

import requests
import json

url = "https://a.4cdn.org/boards.json"
data = json.loads(requests.get(url).content)
for board in data["boards"]:
    char_limit = board["max_comment_chars"]
    if char_limit != 2000:
        print(f"/{board['board']}/: {char_limit}")
