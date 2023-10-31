import 'package:flutter/material.dart';
import 'package:responsive_sizer/responsive_sizer.dart';
import 'package:shimmer/shimmer.dart';

import '../../../../core/utils/colors.dart';
import '../../../../core/utils/pixle_to_percent.dart';
import '../../../../core/utils/ui_converter.dart';

class HomeDoctorLoadShimmerEffect extends StatefulWidget {
  const HomeDoctorLoadShimmerEffect({super.key});

  @override
  State<HomeDoctorLoadShimmerEffect> createState() =>
      _HomeDoctorLoadShimmerEffectState();
}

class _HomeDoctorLoadShimmerEffectState extends State<HomeDoctorLoadShimmerEffect> {
  TextEditingController _controller = TextEditingController();
  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      scrollDirection: Axis.horizontal,
      itemCount: 3,
      itemBuilder: ((context, index) {
        return Padding(
          padding: const EdgeInsets.all(8.0),
          child: Shimmer.fromColors(
            baseColor: Colors.grey.shade300,
            highlightColor: Colors.grey.shade100,
            enabled: true,
            child: Column(
              children: [
                const SizedBox(
                  height: 10,
                ),
              
                const SizedBox(
                  height: 10,
                ),
                hospitalCard(),
                
              ],
            ),
          ),
        );
      }),
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

  Widget hospitalCard() {
    return Container(
      padding: const EdgeInsets.only(bottom: 10),
      decoration: BoxDecoration(
        color: const Color.fromARGB(113, 170, 166, 166),
        borderRadius: BorderRadius.circular(10),
      ),
      child: Column(
        children: [
          multiLineTextShimmer(
              double.infinity, pixleToPercent(290, 'height').h),
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
            height: 10,
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              textShimmer(width: 60),
              textShimmer(width: 60),
              const SizedBox(
                width: 110,
              ),
            ],
          ),
          const SizedBox(
            height: 10,
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              textShimmer(width: 80),
              textShimmer(width: 80),
              textShimmer(width: 80),
              const SizedBox(
                width: 10,
              ),
            ],
          ),
        ],
      ),
    );
  }
}
