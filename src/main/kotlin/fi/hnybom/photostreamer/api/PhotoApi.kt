package fi.hnybom.photostreamer.api

import fi.hnybom.photostreamer.service.FileSystemSource
import fi.hnybom.photostreamer.service.Photo
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Required
import org.springframework.format.annotation.DateTimeFormat
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.time.Instant
import java.util.*

/**
 * Created by hnybom on 9.6.2016.
 */

@RestController
class PhotoApi @Autowired constructor(val service:FileSystemSource) {


    @RequestMapping("/api/find")
    fun find(@RequestParam(value = "from", required = true) @DateTimeFormat(pattern="yyyy-MM-dd") fromDate: Date,
             @RequestParam(value = "to", required = true) @DateTimeFormat(pattern="yyyy-MM-dd") toDate: Date) : List<Photo> {
        val findPhotos = service.findPhotos(fromDate, toDate)
        System.out.println(findPhotos.count())
        return findPhotos
    }
}