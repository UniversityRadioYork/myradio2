pipeline {
    agent {
        node {
            label 'node'
        }
    }

    environment {
        CI = 'true'
    }

    stages {
        stage('Install dependencies') {
            steps {
                sh 'CI=true npm_config_python=/usr/local/bin/python2.7 yarn --no-progress --non-interactive --skip-integrity-check --frozen-lockfile install'
            }
        }

        stage('Type check and run tests') {
            steps {
                sh 'yarn tsc --noEmit --extendedDiagnostics'
                sh 'yarn test'
            }
        }

        stage('Build client') {
            steps {
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