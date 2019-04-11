/* eslint-disable no-warning-comments */
/* eslint-disable camelcase */
const {Command, flags} = require('@oclif/command')
const fs = require('fs')
const request = require('request-promise')
/** TODO:handle the errors, document shit */
class PullCommand extends Command {
  async run() {
    /**
     * save translation files from poeditor to a given path
     *
     * @param {string} code language code
     * @param {number} projectid id of the poe project
     * @param {string} path path to save result file into (folder)
     * @param {string} token api token to authenticate on poe
     * @param {string} type filetype to save
     */
    const exportLanguage = (code, projectid, path, token, type) => {
      request({
        // see: https://poeditor.com/docs/api#projects_export
        url: 'https://api.poeditor.com/v2/projects/export',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        formData: {
          language: code,
          api_token: token,
          id: projectid,
          type: type,
        },
      }, (error, data, body) => {
        // this.log(JSON.parse(body))
        // get the filestream and write it to directory
        let fileName = ''
        let fileRequest = request.get(JSON.parse(body).result.url).on('response', response => {
          // the filename in the response headers must be cleaned first
          fileName = response.headers['content-disposition'].replace('inline; filename=', '').replace(/"/g, '')
          // add slashes to make it a folder path if there are none yet
          if (path.substr(-1) !== '/') path += '/'
          // pipe the request into the writestream to stream the file straight into the folder
          fileRequest.pipe(fs.createWriteStream(path + fileName))
          this.log('🗂  downloaded file: ' + fileName)
        })
      })
    }
    const {flags} = this.parse(PullCommand)
    // set flags to use in request
    const type = flags.type
    const id = flags.id
    const token  = fs.readFileSync('poey.ini', 'utf8').trim()
    if (!token) {
      this.log('😶 oh snap! No token information found at: ', __dirname)
      this.log('👉 please check if you have a poey.ini file and if it contains your token')
    }
    const path = flags.path
    // all flags are needed
    if (type && token && id && path) {
      // get all possible languages we need to export (and use the codes to call the export function afterwards)
      // see: https://poeditor.com/docs/api#languages_list
      request({
        url: 'https://api.poeditor.com/v2/languages/list',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        formData: {
          api_token: token,
          id: id,
        },
      }, (error, data, body) => {
        if (error) {
          this.log('😶 oh snap! there seems to be a problem here, check the error below:')
          this.log(error)
        } else {
          if (JSON.parse(body).result === undefined) this.log('⚠️ seems like there is something wrong with your flags... no languages or project info found')
          JSON.parse(body).result.languages.forEach(language => {
            exportLanguage(language.code, id, path, token, type)
          })
        }
      })
    } else {
      this.log('💥 you need a filetype, a path to save the exports to, a poe-project id and a poey.ini file containing your token for this action 💥')
      this.log('👉 example: poey pull --type key_value_json --id 12345 ')
    }
  }
}

PullCommand.description = `pull exports from poe
...
Download exports from poeditor.com and save them as files straight to your project
`
// example: poey pull --type key_value_json --path file/filestuff  --id 12345
PullCommand.flags = {
  id: flags.string({char: 'id', description: 'project id'}),
  type: flags.string({char: 'type', description: 'filetype to export'}),
  path: flags.string({char: 'path', description: 'target folder'}),
}

module.exports = PullCommand
