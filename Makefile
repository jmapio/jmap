TEMP:= $(shell mktemp -u /tmp/jmap.XXXXXX)

index.html: jmap-spec.mdwn header.inc
	@cat header.inc >> $(TEMP)
	@markdown $< >> $(TEMP)
	anolis --max-depth 2 $(TEMP) > $@
	rm -f $(TEMP)

clean:
	rm -f index.html

PHONY: all clean
