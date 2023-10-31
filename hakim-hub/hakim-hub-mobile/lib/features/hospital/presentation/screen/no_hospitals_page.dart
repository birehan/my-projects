import 'package:flutter/material.dart';
import 'package:hakim_hub_mobile/core/utils/colors.dart';

import '../../../../core/shared_widgets/appBar.dart';
import '../../../../core/utils/ui_converter.dart';

class NoHospitals extends StatelessWidget {
  const NoHospitals({super.key});

  @override
  Widget build(BuildContext context) {
    return 
      SingleChildScrollView(
        child: Padding(
          padding: EdgeInsets.only(
              left: UIConverter.getComponentWidth(context, 50),
              right: UIConverter.getComponentWidth(context, 50)),
          child: Column(
              // mainAxisAlignment: MainAxisAlignment.start,
              // crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const SizedBox(
                  height: 20,
                ),
                Stack(
                  alignment: Alignment.center,
                  children: [
                    Image.asset("assets/images/no_hospitals_back.png"),
                    Image.asset("assets/images/no_hospitals.png")
                  ],
                ),
                const SizedBox(
                  height: 42,
                ),
                const Row(
                  mainAxisAlignment: MainAxisAlignment.start,
                  children: [
                    Text(
                      "Oops",
                      style: TextStyle(
                          fontSize: 45,
                          fontWeight: FontWeight.w700,
                          color: primaryTextColor),
                    ),
                  ],
                ),
                const Text(
                  "Seems like the hospital you're looking doesn't exist in our platform, ",
                  style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.w600,
                      color: primaryTextColor),
                ),
                const SizedBox(
                  height: 20,
                ),
              ]),
        ),
    );
  }
}
