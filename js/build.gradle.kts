import org.apache.tools.ant.taskdefs.condition.Os
import kotlin.String

group = "io.github.revenge.plugin"

tasks {
    val installDependencies by registering(Exec::class) {
        group = "build"
        description = "Installs npm dependencies"
        commandLine("npm", "install")
    }

    val build by registering(Exec::class) {
        group = "build"
        description = "Runs the build script"
        commandLine("npm", "run", "build")
    }
}

configurations {
    create("jsConfiguration") {
        isCanBeResolved = false
        isCanBeConsumed = true

        outgoing.artifact(layout.buildDirectory.dir("revenge")) {
            builtBy(tasks.named("build"))
        }
    }
}
