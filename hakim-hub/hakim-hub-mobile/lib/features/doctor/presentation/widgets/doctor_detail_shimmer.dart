import 'package:flutter/material.dart';
import 'package:hakim_hub_mobile/core/utils/colors.dart';
import 'package:responsive_sizer/responsive_sizer.dart';
import 'package:shimmer/shimmer.dart';

import '../../../../core/shared_widgets/shared_widget_shimmer.dart';
import '../../../../core/utils/pixle_to_percent.dart';

class DoctorDetailShimmer extends StatelessWidget {
  const DoctorDetailShimmer({super.key});

  @override
  Widget build(BuildContext context) {
    return Shimmer.fromColors(
      baseColor: Colors.grey.shade300,
      highlightColor: Colors.grey.shade100,
      enabled: true,
      child: SingleChildScrollView(
        child: Center(
          child: Padding(
            padding: const EdgeInsets.only(top: 50),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Container(
                  width: pixleToPercent(200, 'width').w,
                  height: pixleToPercent(200, 'height').h,
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(
                      pixleToPercent(100, 'width').w,
                    ),
                    color: shimmerColor,
                  ),
                ),
                const SizedBox(
                  height: 15,
                ),
                Container(
                  width: pixleToPercent(280, "width").w,
                  height: 20,
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(8),
                    color: shimmerColor,
                  ),
                ),
                const SizedBox(
                  height: 15,
                ),
                Container(
                  width: pixleToPercent(200, "width").w,
                  height: 15,
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(8),
                    color: shimmerColor,
                  ),
                ),
                const SizedBox(
                  height: 10,
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Container(
                      width: pixleToPercent(20, "width").w,
                      height: pixleToPercent(20, "height").h,
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(2),
                        color: shimmerColor,
                      ),
                    ),
                    const SizedBox(
                      width: 5,
                    ),
                    Container(
                      width: pixleToPercent(150, "width").w,
                      height: 13,
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(5),
                        color: shimmerColor,
                      ),
                    ),
                  ],
                ),
                const SizedBox(
                  height: 25,
                ),
      
                // Biography
                const WidgetAndText(),
                const SizedBox(
                  height: 10,
                ),
                // Education
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Container(
                      width: pixleToPercent(300, 'width').w,
                      height: pixleToPercent(300, 'height').h,
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(8),
                        color: shimmerColor,
                      ),
                    ),
                    const SizedBox(
                      width: 25,
                    )
                  ],
                ),
                const SizedBox(
                  height: 30,
                ),
                // Education
                const WidgetAndText(),
                const SizedBox(
                  height: 30,
                ),
                const Column(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    WidgetAndText(),
                    SizedBox(
                  height: 10,
                ),
                    WidgetAndText()
                  ],
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}
