#!/bin/sh

DB="/volume1/@appstore/minidlna/var/cache/files.db"

echo -e "Content-Type: text/html\r\n\r\n"

echo '<html>'
echo '<head>'
echo '<link rel="stylesheet" type="text/css" href="/scripts/ext-3/resources/css/ext-all.css"/>'
echo '<link rel="stylesheet" type="text/css" href="/scripts/ext-3/resources/css/xtheme-gray.css"/>'
echo '</head>'

echo '<body>'
echo '<h1>MiniDLNA Database Info</h1>'


echo '<table border="1">'

echo '<tr>'
echo '<th>Type</th>'
echo '<th>Files</th>'
echo '<th>Last scanned</th>'
echo '</tr>'

echo '<tr>'
echo '<td>Video</td>'
echo '<td>'
sqlite3 $DB "select count(*) from DETAILS where MIME glob 'video/*'"
echo '</td>'
echo '<td>'
sqlite3 $DB "select PATH from DETAILS where MIME glob 'video/*' order by ID desc limit 1"
echo '</td>'
echo '</tr>'

echo '<tr>'
echo '<td>Audio</td>'
echo '<td>'
sqlite3 $DB "select count(*) from DETAILS where MIME glob 'audio/*'"
echo '</td>'
echo '<td>'
sqlite3 $DB "select PATH from DETAILS where MIME glob 'audio/*' order by ID desc limit 1"
echo '</td>'
echo '</tr>'

echo '<tr>'
echo '<td>Images</td>'
echo '<td>'
sqlite3 $DB "select count(*) from DETAILS where MIME glob 'image/*'"
echo '</td>'
echo '<td>'
sqlite3 $DB "select PATH from DETAILS where MIME glob 'image/*' order by ID desc limit 1"
echo '</td>'
echo '</tr>'

echo '</table>'

echo '<a href="javascript:location.reload(true)">refresh</a>'

echo '</body></html>'
