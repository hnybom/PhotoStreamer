package fi.hnybom.photostreamer

import com.fasterxml.jackson.module.kotlin.KotlinModule
import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.EnableAutoConfiguration
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.ComponentScan
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder

/**
 * Created by hnybom on 8.6.2016.
 */

@SpringBootApplication
open class Application {

    @Bean
    open fun objectMapperBuilder(): Jackson2ObjectMapperBuilder
            = Jackson2ObjectMapperBuilder().modulesToInstall(KotlinModule())

}

fun main(args: Array<String>) {
    SpringApplication.run(Application::class.java, *args)
}
