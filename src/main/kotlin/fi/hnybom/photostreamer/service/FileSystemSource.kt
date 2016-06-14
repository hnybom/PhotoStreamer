package fi.hnybom.photostreamer.service

import org.springframework.stereotype.Service
import java.io.File
import java.util.*

/**
 * Created by hnybom on 8.6.2016.
 */

data class Photo(val name: String, val timestamp: Date, val path: String)

@Service
class FileSystemSource {

    val emptyPhoto = Photo("", Date(), "")

    val photos: List<Photo>

    init {
        val walker = File(fi.hnybom.photostreamer.rootFolder2).walkTopDown()
        val mappedPhotos = walker.map(fun(file): Photo {
            if(file.name.endsWith("jpg", true) || file.name.endsWith("jpeg", true)) {
                return Photo(file.name, Date(file.lastModified()), "/images/" + file.absolutePath.substring(fi.hnybom.photostreamer.rootFolder2.length))
            }
            return emptyPhoto
        })

        photos = mappedPhotos.filter { f -> f != emptyPhoto }.sortedBy { p -> p.timestamp }.toList()
    }

    fun findPhotos(start:Date, end:Date):List<Photo> {
        return photos.filter { p -> p.timestamp.after(start) && p.timestamp.before(end) }
    }

}