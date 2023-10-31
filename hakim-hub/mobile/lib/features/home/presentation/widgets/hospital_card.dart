import 'package:flutter/material.dart';
import 'package:responsive_sizer/responsive_sizer.dart';

import '../../../../core/utils/colors.dart';
import '../../../../core/utils/pixle_to_percent.dart';
import '../../../hospital/presentation/widgets/chips_container.dart';

class HospitalsCard extends StatelessWidget {
  String name;
  String address;
  String imageUrl;
  List chipList = ["Cardio", "Generel", "Pediatrics"];
  String isOpened;

  HospitalsCard(
      {required this.name,
      required this.address,
      required this.chipList,
      required this.imageUrl,
      required this.isOpened,
      super.key});

  @override
  Widget build(BuildContext context) {
    return Stack(children: [
      Container(
        margin: const EdgeInsets.only(bottom: 10, top: 10),
        width: pixleToPercent(301, "width").w,
        height: pixleToPercent(230, "height").h,
        decoration: const BoxDecoration(
            color: secondryTextColor,
            borderRadius: BorderRadius.all(Radius.circular(20)),
            boxShadow: [
              BoxShadow(
                  color: hospitalBorderShadowColor,
                  blurRadius: 3,
                  offset: Offset(0, 3),
                  spreadRadius: 0.5)
            ]),
        child: Column(crossAxisAlignment: CrossAxisAlignment.center, children: [
          Container(
            width: pixleToPercent(301, "width").w,
            height: pixleToPercent(114, "height").h,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.only(
                  topLeft: Radius.circular(20), topRight: Radius.circular(20)),
              image: DecorationImage(
                  image: NetworkImage(imageUrl),
                  onError: (exception, stackTrace) {
                    AssetImage("assets/images/hospital_img.png");
                  },
                  fit: BoxFit.cover),
            ),
          ),
          SizedBox(
            height: pixleToPercent(10, "height").h,
          ),
          Padding(
            padding: EdgeInsets.only(left: pixleToPercent(20, "width").w),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  name,
                  style: TextStyle(
                      color: titleTextColor,
                      fontSize: 15.sp,
                      fontWeight: FontWeight.w600),
                  maxLines: 1,
                ),
                SizedBox(
                  height: pixleToPercent(10, "height").h,
                ),
                SizedBox(
                  width: pixleToPercent(300, "width").w,
                  height: pixleToPercent(35, "height").h,
                  child: ListView.builder(
                    physics: const AlwaysScrollableScrollPhysics(),
                    scrollDirection: Axis.horizontal,
                    itemCount: chipList.length,
                    itemBuilder: ((context, index) {
                      return chipsContainer(chipList[index]);
                    }),
                  ),
                ),
                SizedBox(
                  height: pixleToPercent(7, "height").h,
                ),
              ],
            ),
          ),
          Padding(
            padding: const EdgeInsets.only(right: 20),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                Icon(
                  Icons.location_on,
                  size: pixleToPercent(23, "height").h,
                ),
                SizedBox(
                  width: pixleToPercent(5, "width").w,
                ),
                SizedBox(
                  width: pixleToPercent(200, "width").w,
                  child: Text(
                    address,
                    style: TextStyle(
                      fontWeight: FontWeight.w400,
                      fontSize: 16.sp,
                    ),
                    maxLines: 1,
                  ),
                )
              ],
            ),
          )
        ]),
      ),
    ]);
  }
}
