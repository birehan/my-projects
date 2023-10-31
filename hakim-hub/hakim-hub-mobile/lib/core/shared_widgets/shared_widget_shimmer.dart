import 'package:flutter/material.dart';
import 'package:responsive_sizer/responsive_sizer.dart';

import '../utils/colors.dart';
import '../utils/pixle_to_percent.dart';

class WidgetAndText extends StatelessWidget {
  const WidgetAndText({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Container(
          height: pixleToPercent(20, 'height').h,
          width: pixleToPercent(25, 'width').w,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(2),
            color: shimmerColor,
          ),
        ),
        const SizedBox(
          width: 5,
        ),
        Container(
          height: 20,
          width: pixleToPercent(200, 'width').w,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(8),
            color: shimmerColor,
          ),
        ),
        Container(
          width: pixleToPercent(100, 'width').w,
        ),
      ],
    );
  }
}
