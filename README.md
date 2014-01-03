MiniDLNA for Synology DS213j
============================

This is a package for installing MiniDLNA aka. ReadyDLNA on a DS213j.

This package was built on top of the one available at http://spk.unzureichende.info/,
more specifically http://spk.unzureichende.info/dl/minidlna-1.0.22-3-armv5.spk

The binary and libraries have been replaced by a slightly newer version from Debian
and have not been self compiled.

Since the authentication mechanism in newer DSM has been changed, the config editor
that came with the original package no longer works. Instead a very simple status
CGI will be opened when you click on the Iconon in DSM.

This package is preconfigured, but you probably want to check the config yourself
via SSH. It can be found in /volume1/@appstore/minidlna/etc/minidlna.conf

The service can be restarted and run in debug mode via
/var/packages/minidlna/scripts/start-stop-status

Caveats
-------

The status script sometimes fails to report data, another reload usually helps.
Probably some lockups with the SQLite database.

MiniDLNA loves to simply abort the scan process when it encounters a file it doesn't
likei, which is a pain to debug. The last file added as shown in the status script can
give you a hint where to look. It's usually the next file that is the trouble maker.

Use this at your own risk. I hacked this together for my own needs, I will NOT give
support. Pull-Requests are welcome, though.
