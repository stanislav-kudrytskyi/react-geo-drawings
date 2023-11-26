start:
	npm run storybook

release:
	npm run build
	npm version patch
	npm publish