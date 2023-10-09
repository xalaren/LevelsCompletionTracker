import fs from 'fs-extra'

fs.copySync('assets/img', '../LevelsCompletionTracker.WebApi/wwwroot/assets/img');

fs.copySync('assets/pages', '../LevelsCompletionTracker.WebApi/wwwroot/assets/pages');