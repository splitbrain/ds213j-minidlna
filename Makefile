include INFO

build:
	tar -czvf package.tgz -C package .
	tar -cvf minidlna-$(version).$(arch).spk INFO package.tgz scripts PACKAGE_ICON.PNG

clean:
	-rm package.tgz
	-rm minidlna-*.spk
