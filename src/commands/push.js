/* eslint-disable camelcase */
const {Command, flags} = require('@oclif/command')
const fs = require('fs')
const request = require('request')

class PushCommand extends Command {
  async run() {
    const {flags} = this.parse(PushCommand)
    // set flags to use in request
    const path = flags.path
    const id = flags.id
    const token  = fs.readFileSync('poey.ini', 'utf8').trim()
    if (!token) {
      this.log('😶 oh snap! No token information found at: ', __dirname)
      this.log('👉 please check if you have a poey.ini file and if it contains your token')
    }
    const lang = flags.lang
    // all flags are needed
    if (path && token && id && lang) {
      // upload with file
      // see: https://poeditor.com/docs/api#projects_upload
      request({
        url: 'https://api.poeditor.com/v2/projects/upload',
        method: 'POST',
        formData: {
          api_token: token,
          id: id,
          language: lang,
          overwrite: 0,
          file: fs.createReadStream(path),
          updating: 'terms_translations',
        },
      }, (error, data, body) => {
        if (error) {
          this.log('😶 oh snap! there seems to be a problem here, check the error below:')
          this.log(error)
        } else if (JSON.parse(body).result) {
          this.log('📒 Terms updated: ' + JSON.stringify(JSON.parse(body).result.terms))
          this.log('💬 Translations updated: ' + JSON.stringify(JSON.parse(body).result.translations))
        }
      })
    } else {
      this.log('💥 you need a json, a poe-project id and a poey.ini file containing your token for this action 💥 ')
      this.log('👉 example: poey push --path /dev/coolProject/translations/coolProject_English.json --id 12345 --lang de  ')
    }
  }
}

PushCommand.description = `Push a json to poe
...
Uploads a file and its contents to poeditor and adds both keys of the file to the terms and translations of the file to the active translation, it does NOT overwrite existing translations!
All flags are required.
`
// example: poey push --path /Users/raphael/Desktop/dev/translationCli/poey/testfiles/testproject_English.json --id 12345 --lang de
PushCommand.flags = {
  path: flags.string({char: 'path', description: 'path to json'}),
  id: flags.string({char: 'id', description: 'project id'}),
  lang: flags.string({char: 'lang', description: 'language code'}),
}

module.exports = PushCommand
