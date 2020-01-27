pipeline {
 agent {
  node {
   label 'node'
  }
 }

 stages {
  stage('Build client') {
   steps {
    sh 'CI=true yarn --no-progress --non-interactive --skip-integrity-check --frozen-lockfile install'
    sh 'npm_config_python=/usr/local/bin/python2.7 yarn build'
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