import 'package:flutter/material.dart';
import 'package:responsive_sizer/responsive_sizer.dart';

import '../../../../../core/utils/colors.dart';
import '../../../../../core/utils/pixle_to_percent.dart';
import 'package:shimmer/shimmer.dart';

class HospitalOverViewShimmerEffect extends StatefulWidget {
  const HospitalOverViewShimmerEffect({super.key});

  @override
  State<HospitalOverViewShimmerEffect> createState() =>
      _HospitalOverViewShimmerEffectState();
}

class _HospitalOverViewShimmerEffectState
    extends State<HospitalOverViewShimmerEffect> {
  @override
  Widget build(BuildContext context) {
    return Shimmer.fromColors(
      
      baseColor: Colors.grey.shade300,
      highlightColor: Colors.grey.shade100,
      enabled: true,
      child:  SingleChildScrollView(
        child: Column(
          children:  [
            const SizedBox(
              height: 10,
            ),
            textShimmer(width: 250, height: 20),
            const SizedBox(
              height: 10,
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                appBarTexts('Overview', true),
                appBarTexts('Doctors', false),
                appBarTexts('Gallery', false),
              ],
            ),
            const SizedBox(
              height: 10,
            ),
            multiLineTextShimmer(360, 270),
            const SizedBox(
              height: 25,
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                textShimmer(width: 250),
                const SizedBox(
                  width: 60,
                )
              ],
            ),
            const SizedBox(
              height: 5,
            ),
            multiLineTextShimmer(360, 170),
            const SizedBox(
              height: 10,
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                textShimmer(width: 250),
                const SizedBox(
                  width: 60,
                )
              ],
            ),
            const SizedBox(
              height: 5,
            ),
            multiLineTextShimmer(360, 170),
          ],
        ),
      ),
    );
  }

  Container multiLineTextShimmer(width, height) {
    return Container(
      width: pixleToPercent(width, 'width').w,
      height: pixleToPercent(height, 'height').h,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(8),
        color: shimmerColor,
      ),
    );
  }

  Container textShimmer({width, height = 14}) {
    return Container(
      width: pixleToPercent(width, "width").w,
      height: 14,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(8),
        color: shimmerColor,
      ),
    );
  }

  Text appBarTexts(String text, isSelected) {
    return Text(
      text,
      style: TextStyle(
        fontSize: 13,
        decoration: isSelected ? TextDecoration.underline : TextDecoration.none,
        decorationColor: Colors.blue,
        decorationThickness: 3,
      ),
    );
  }
}
