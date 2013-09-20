BUNDLE = static/js/bundle.js
BUILD_DIR = static/js/build
TEMPLATES = ./templates
COMPILED_TEMPLATES = $(BUILD_DIR)/templates.js
LIBS = bower_components/jquery/jquery.js bower_components/momentjs/moment.js node_modules/nunjucks/browser/nunjucks.js bower_components/png-js/png.js 
SRCS = $(LIBS) $(COMPILED_TEMPLATES) src/main.js 

build: $(BUNDLE)

clean:
	rm -f $(BUNDLE) $(BUILD_DIR)/*

$(BUNDLE): $(SRCS)
	./node_modules/.bin/uglifyjs $(SRCS) -d PORT=$(PORT),ORIGIN=\"$(ORIGIN)\" -c --output $(BUNDLE)

$(COMPILED_TEMPLATES): $(TEMPLATES)
	./node_modules/.bin/nunjucks-precompile $(TEMPLATES) > $(COMPILED_TEMPLATES)

run: build
	node app.js

all: clean build
