import 'package:flutter/material.dart';
import 'package:hakim_hub_mobile/core/utils/colors.dart';
import 'package:responsive_sizer/responsive_sizer.dart';
import 'package:animated_text_kit/animated_text_kit.dart';
import '../../../../core/utils/pixle_to_percent.dart';

class HowAreYouFeeling extends StatefulWidget {
  const HowAreYouFeeling({super.key});

  @override
  State<HowAreYouFeeling> createState() => _HowAreYouFeelingState();
}

class _HowAreYouFeelingState extends State<HowAreYouFeeling> {
  @override
  Widget build(BuildContext context) {
    final customTextStyle = TextStyle(
      fontSize: 16.sp,
      color: primaryTextColor,
    );
    // final customTextStyle = GoogleFonts.hammersmithOne(
    //   fontSize: 16.sp,
    //   fontStyle: FontStyle.italic,
    //   color: primaryTextColor,
    // );

    return Container(
      padding: EdgeInsets.symmetric(
        horizontal: pixleToPercent(4, "width").w,
      ),
      width: double.infinity,
      height: pixleToPercent(56, "height").h,
      decoration: BoxDecoration(
        color: const Color(0XFFEDEDED),
        borderRadius: BorderRadius.all(
          Radius.circular(
            pixleToPercent(26, "height").h,
          ),
        ),
      ),
      child: ListTile(
        leading: Icon(
          Icons.person_2_outlined,
          size: pixleToPercent(20, "width").w,
        ),
        title: AnimatedTextKit(repeatForever: true, animatedTexts: [
          TypewriterAnimatedText(
            "How are you feeling?",
            textStyle: customTextStyle,
            speed: const Duration(milliseconds: 100),
          ),
          TypewriterAnimatedText(
            "Write your symptoms",
            textStyle: customTextStyle,
            speed: const Duration(milliseconds: 100),
          ),
          TypewriterAnimatedText(
            "Chat with AI",
            textStyle: customTextStyle,
            speed: const Duration(milliseconds: 100),
          ),
          TypewriterAnimatedText(
            "I am your medical assistant",
            textStyle: customTextStyle,
            speed: const Duration(milliseconds: 100),
          ),
        ]),
        trailing: Icon(
          Icons.send,
          color: Colors.blue,
          size: pixleToPercent(20, "width").w,
        ),
      ),
    );
  }
}
