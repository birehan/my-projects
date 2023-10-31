import 'package:url_launcher/url_launcher.dart';

void launchPhoneUrl(String phoneNumber) async {
  final phoneUrl = 'tel:$phoneNumber';
  if (await canLaunch(phoneUrl)) {
    await launch(phoneUrl);
  } else {
    throw 'Could not launch $phoneNumber';
  }
}