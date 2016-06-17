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

    val photos: List<Photo>

    init {
        val walker = File(fi.hnybom.photostreamer.rootFolder2).walkTopDown()
        photos = walker
                .filter{it.name.endsWith("jpg", true) || it.name.endsWith("jpeg", true)}
                .map{Photo(it.name, Date(it.lastModified()), "/images/" + it.absolutePath.substring(fi.hnybom.photostreamer.rootFolder2.length))}
                .sortedBy { it.timestamp }.toList()
    }

    fun findPhotos(start:Date, end:Date):List<Photo> {
        return photos.filter { it.timestamp.after(start) && it.timestamp.before(end) }
    }

}