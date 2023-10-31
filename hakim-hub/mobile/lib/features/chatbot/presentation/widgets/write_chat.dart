import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:responsive_sizer/responsive_sizer.dart';
import '../../../../core/utils/colors.dart';
import '../../../../core/utils/icons.dart';
import '../../../../router/routes.dart';

class WriteChat extends StatelessWidget {
  WriteChat({super.key});
  final TextEditingController _controller = TextEditingController();
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(
        horizontal: Adaptive.w(5.1),
      ),
      child: Container(
        padding: EdgeInsets.symmetric(
          horizontal: Adaptive.w(7),
          // vertical: Adaptive.h(1),
        ),
        decoration: BoxDecoration(
          color: backgroundColor,
          borderRadius: BorderRadius.circular(
            Adaptive.w(4.6),
          ),
        ),
        child: TextField(
          controller: _controller,
          textInputAction: TextInputAction.search,
          onSubmitted: (value) {
            context.pushNamed(AppRoutes.ChatPage, queryParameters: {
              "chatBotIntialMessage": _controller.text ?? ""
            });
          },
          decoration: InputDecoration(
            suffixIcon: GestureDetector(
              child: send,
              onTap: () {
                context.pushNamed(AppRoutes.ChatPage, queryParameters: {
                  "chatBotIntialMessage": _controller.text ?? ""
                });
              },
            ),
            hintText: 'Write a message ...',
            border: InputBorder.none,
          ),
        ),
      ),
    );
  }
}
