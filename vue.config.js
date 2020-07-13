// vue.config.js
module.exports = {
	publicPath: process.env.NODE_ENV === 'production'
   		? './'
		: '/',
	assetsDir: '',
	productionSourceMap: false,
	outputDir: 'docs',
	//filenameHashing: false
  }