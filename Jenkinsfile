#!/usr/bin/env groovy
@Library('ostk-pipeline')
import com.overstock.dx.Pipeline
import groovy.json.*
def areDeploying = env.BRANCH_NAME == 'master'

new Pipeline(this).execute {

  installWebhooks(scm)

  node {
    echo "Cleaning up dangling docker images..."
    sh 'docker system prune -a -f'
    // Checkout code, cleaning the tree first if necessary
    ostkCheckout()

    if (! areDeploying) {
      //Code should be here for static file publish on non-prod
      stage("Static:  Deploy test") {
          echo "Branch is ${env.BRANCH_NAME}..."
  
          // Replace '$appName' with the lower-cased version of your app's official name
          // If your app's name is "SomeSpecial-Service", replace '$appName' with "somespecial-service"
          def image = docker.build('opro')
        
          image.inside() {
              sh 'cp -R /dist/dist ${WORKSPACE}/dist'

              // Publish static files
              echo "Publishing static files to nexus..."
              staticPublish = staticFiles.publish()
              
              if (!staticPublish) {
                error "ERROR: Unable to publish static files to Nexus ${staticPublish.message}"
              } else {
                echo 'SUCCESS: Static files were published to Nexus'
                echo JsonOutput.prettyPrint(staticPublish.jsonStr)
              }
              //Push to test
              echo "Deploying static files to test..."
              staticDeployTest = staticFiles.deploy('test')
              if (!staticDeployTest) {
                error "ERROR: Unable to deploy static files to test ${staticDeployTest.message}"
              } else {
                echo 'SUCCESS: Static files were deployed to test'
                echo JsonOutput.prettyPrint(staticDeployTest.jsonStr)
              }
          }//end of image inside 
    
          // Verify files are accessible by public URI with matching sha256
          staticDeployTest.jsonObj.files.each { key, value ->
            sleep time: 30, unit: 'SECONDS' // This step should prevent intermittent errors where file is not yet available
            expectedSha256 = sh(returnStdout: true, script: "curl -s ${value.publicUri} | sha256sum | tr -d ' -'").trim()
            actualSha256 = value.hash.hex
            echo "Sha256 - actual:${actualSha256}, expected:${expectedSha256}"
            if (actualSha256 != expectedSha256) {
              error "ERROR: Verification that ${key} was deployed as ${value.publicUri} failed"
            } else {
              echo "SUCCESS:  The file ${key} was verified deployed as ${value.publicUri}"
            }
          }//end of Verify files
        }//end of stage
    }else {
      String newVersion

      stage('Build') {
        newVersion = ostkSetVersions()
        // Replace '$appName' with the lower-cased version of your app's official name
        // If your app's name is "SomeSpecial-Service", replace '$appName' with "somespecial-service"
        docker.build($appName).tag(newVersion)

        // Optional; perform sanity checks on generated image; will abort the build on failure, but pass 'false' to
        // allow build to continue anyway
        imageChecks()
      }

      stage('Tag/Push') {
        // This will both tag your docker image (if not already) as well as your source
        // The image will also be pushed to the registry
        ostkTagRelease(newVersion)
      }
      clmScan()
    }
  }

  if (areDeploying) {
    String serviceUrl

    stage('Deploy (Pre-prod)') {
      // This step may take a while and will not return until the app's health check passes.  Don't panic if this
      // takes a few minutes!
      def deployResult = deploy.start('prod')
      if (deployResult) {
        serviceUrl = deployResult.serviceUrl
        echo "Service url: ${serviceUrl}"
      } else {
        error "Could not execute initial deploy"
      }
    }

    // Everything needed to ensure we're good to go to production
    stage('Acceptance') {
      //include mocha test case
      try {
        timeout(time: 1, unit: 'HOURS') {
          // By default, this will do nothing except require a manual button push.  This is sub-optimal in a CD pipeline
          // and is for illustration purposes only; read the documentation for this step to implement properly, or
          // remove the step if there is nothing suitable to do here.
          ostkAcceptanceTests(serviceUrl)
        }
      }
      catch (Exception e) {
        echo "Testing was aborted or failed; attempting to cancel deploy"
        deploy.cancel()
        throw e
      }
    }

    stage('Deploy (Prod)') {
      success = deploy.finish()
      if (! success) {
        error "Could not execute production deploy"
      }
    }
  }
}
