pipeline {
 agent any

 stages {
  stage('Build client') {
   steps {
    sh 'CI=true yarn --no-progress --non-interactive --skip-integrity-check --frozen-lockfile install'
    sh 'yarn build'
   }
  }

  stage('Deploy to dev instance') {
   steps {
    sshagent(credentials: ['ury']) {
     sh 'rsync -av --delete-after build/ deploy@ury:/usr/local/www/myradio2-dev'
    }
   }
  }
 }
}