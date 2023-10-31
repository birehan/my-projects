import 'package:flutter/material.dart';
import 'package:hakim_hub_mobile/core/utils/colors.dart';
import 'package:hakim_hub_mobile/features/hospital/data/models/hospital_address.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:hakim_hub_mobile/core/utils/ui_converter.dart';

class HospitalMap extends StatelessWidget {
   final double latitude;
  final double longitude;
  
   HospitalMap({required this.latitude, required this.longitude});
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () async {
       await _openMap();
      },
      child: Text(
        "SEE IT ON MAP",
        style: TextStyle(fontSize: UIConverter.getComponentHeight(context, 15),color: primaryColor),
      ),
    );
  }

  Future<void> _openMap() async {
    final String googleMapsUrl =
        "https://www.google.com/maps/search/?api=1&query=$latitude,$longitude";
    if (await canLaunchUrl(Uri.parse(googleMapsUrl))) {
      await launchUrl(Uri.parse(googleMapsUrl));
    } else {
      throw 'Could not launch $googleMapsUrl';
    }
  }
}