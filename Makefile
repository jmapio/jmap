PHONY: all clean

all: index.html spec.html client.html server.html

index.html: header.inc \
		home/faq.mdwn \
		footer.inc
	cp header.inc $@
	markdown home/faq.mdwn >> $@
	cat footer.inc >> $@

spec.html: header.inc \
		spec/apimodel.mdwn \
		spec/datamodel.mdwn \
		spec/accounts.mdwn \
		spec/mailbox.mdwn \
		spec/messagelist.mdwn \
		spec/thread.mdwn \
		spec/message.mdwn \
		spec/searchsnippet.mdwn \
		spec/upload.mdwn \
		footer.inc
	cp header.inc $@
	markdown spec/apimodel.mdwn >> $@
	markdown spec/datamodel.mdwn >> $@
	markdown spec/accounts.mdwn >> $@
	markdown spec/mailbox.mdwn >> $@
	markdown spec/messagelist.mdwn >> $@
	markdown spec/thread.mdwn >> $@
	markdown spec/message.mdwn >> $@
	markdown spec/searchsnippet.mdwn >> $@
	markdown spec/upload.mdwn >> $@
	cat footer.inc >> $@

client.html: header.inc \
		client-guide/jmap-client-guide.mdwn \
		footer.inc
	cp header.inc $@
	markdown client-guide/jmap-client-guide.mdwn >> $@
	cat footer.inc >> $@

server.html: header.inc \
		server-guide/jmap-server-guide.mdwn \
		footer.inc
	cp header.inc $@
	markdown server-guide/jmap-server-guide.mdwn >> $@
	cat footer.inc >> $@

clean:
	rm -f index.html spec.html client.html server.html
