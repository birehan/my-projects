import 'package:geolocator/geolocator.dart';
import 'package:url_launcher/url_launcher.dart';

Future<void> openMap(
  {
  Position? currentPosition, required double hospitalLatitude, required hospitalLongitude,
}) async {
  String googleMapsUrl;
  if (currentPosition != null) {
    googleMapsUrl =
        "https://www.google.com/maps/dir/?api=1&destination=$hospitalLatitude,$hospitalLongitude&origin=${currentPosition.latitude},${currentPosition.longitude}";
  } else {
    googleMapsUrl =
        "https://www.google.com/maps/search/?api=1&query=$hospitalLatitude,$hospitalLongitude";
  }
  if (await canLaunch(googleMapsUrl)) {
    await launch(googleMapsUrl);
  } else {
    throw 'Could not launch $googleMapsUrl';
  }
}