# Your mmark binary
MMARK := mmark

rfc/build/%.xml: rfc/src/%.mdown spec/%/*
	mkdir -p $(@D)
	cat $< | $(MMARK) > $@

rfc/build/%.txt: rfc/build/%.xml
	xml2rfc --text $<

rfc/build/%.html: rfc/build/%.xml
	xml2rfc --html $<

.PHONY: build

build: rfc/build/jmap.txt rfc/build/jmap.html rfc/build/mail.txt rfc/build/mail.html rfc/build/contacts.txt rfc/build/contacts.html rfc/build/calendars.txt rfc/build/calendars.html rfc/build/mdn.txt rfc/build/mdn.html

xml: rfc/build/jmap.xml rfc/build/mail.xml rfc/build/contacts.xml rfc/build/calendars.xml rfc/build/mdn.xml

clean:
	rm -rf rfc/build
