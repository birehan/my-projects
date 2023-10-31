import 'package:flutter/material.dart';

import '../../../core/utils/colors.dart';

class buildDots extends StatelessWidget {
  const buildDots({
    super.key,
    required this.currentIndex,
    required this.index,
    required this.context,
  });

  final int currentIndex;
  final int index;
  final BuildContext context;

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 7,
      width: currentIndex == index ? 25 : 7,
      margin: EdgeInsets.only(right: 10),
      decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(20), color: primaryColor),
    );
  }
}
