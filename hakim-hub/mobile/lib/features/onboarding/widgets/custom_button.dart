import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../../core/shared_widgets/bottom_nav.dart';
import '../../../core/utils/colors.dart';
import '../../../core/utils/ui_converter.dart';
import '../../../router/routes.dart';
import '../../hospital/presentation/screen/hospitals_home_screen.dart';

class CustomButton extends StatelessWidget {
  final context;
  int currentIndex;
  final controller;
  final updateIndex;
  final pages;

  CustomButton({
    super.key,
    required this.context,
    required this.controller,
    required this.currentIndex,
    required this.pages,
    required this.updateIndex,
  });

  @override
  Widget build(
    BuildContext context,
  ) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 35),
      child: Container(
        height: UIConverter.getComponentHeight(context, 40),
        width: UIConverter.getComponentWidth(context, 153),
        child: TextButton(
          onPressed: () {
            if (currentIndex == pages.length - 1) {
              context.pushNamed(AppRoutes.Home, queryParameters: {
                                      "index": "0",
                                    });
            }

            controller.nextPage(
              duration: const Duration(milliseconds: 80),
              curve: Curves.bounceIn,
            );
            updateIndex(currentIndex += 1);
          },
          style: ButtonStyle(
            shape: MaterialStateProperty.all<RoundedRectangleBorder>(
              RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(10.0),
              ),
            ),
            backgroundColor: MaterialStateProperty.all(primaryColor),
            foregroundColor: MaterialStateProperty.all(secondryTextColor),
          ),
          child:
              Text(currentIndex == pages.length - 1 ? "Get Started" : "Next"),
        ),
      ),
    );
  }
}
