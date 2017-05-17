import io
import re
import csv
import json
import requests
from pathlib import Path

# get html to find mapping between sheet name & ID
sheetsHTML = 'https://docs.google.com/spreadsheets/u/1/d/1WIQX3fTkTf7q8GtqB7SlN7HRRUdjNmJKohGazG5EdYU/pubhtml'
response = requests.get(sheetsHTML)
pattern = '<ul id="sheet-menu">.*</ul>'
menu = re.search(pattern, response.text).group(0)

pattern = 'id="sheet-button-(\d*)"><a[^>]*>([^<]+)<\/a>'
result = re.findall(pattern, menu)
sheets = {}
for row in result:
    sheets[row[1]] = row[0]
del response

# get data from each sheet
url = 'https://docs.google.com/spreadsheets/d/1WIQX3fTkTf7q8GtqB7SlN7HRRUdjNmJKohGazG5EdYU/pub?single=true&output=csv&gid='
for graphID, sheetID in sheets.items():
    response = requests.get(url + sheetID)
    response.encoding = 'utf-8'
    reader = csv.DictReader(io.StringIO(response.text))
    rows = list(reader)

    dump = []
    if(graphID != 'graphs'):
        # dump = [row for row in rows]
        for row in rows:
            row['fix'] = row['show'] = True if row['show'] == 'yes' else False
            dump.append(row)
        with open('data/' + graphID + '.json', 'w+', encoding='utf-8') as f:
            json.dump(dump, f, indent=4, ensure_ascii=False)
