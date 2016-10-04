
MMARK := /Users/neil/Code/Go/src/github.com/miekg/mmark/mmark/mmark -xml2 -page

rfc/build/%.xml: rfc/src/%.mdown spec/%/*
	mkdir -p $(@D)
	cat $< | $(MMARK) > $@

rfc/build/%.txt: rfc/build/%.xml
	tclsh ~/xml2rfc-dev/xml2rfc.tcl --text `pwd`/$^ `pwd`/$@

rfc/build/%.html: rfc/build/%.xml
	tclsh ~/xml2rfc-dev/xml2rfc.tcl --html `pwd`/$^ `pwd`/$@

.PHONY: build

build: rfc/build/jmap.txt rfc/build/jmap.html rfc/build/mail.txt rfc/build/mail.html rfc/build/contacts.txt rfc/build/contacts.html rfc/build/calendars.txt rfc/build/calendars.html

xml: rfc/build/jmap.xml rfc/build/mail.xml rfc/build/contacts.xml rfc/build/calendars.xml
