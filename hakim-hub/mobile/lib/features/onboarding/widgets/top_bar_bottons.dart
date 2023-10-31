import 'package:flutter/material.dart';

import '../../../core/utils/colors.dart';

class OnbordingTopBarButtons extends StatefulWidget {
  final currentIndex;
  final updateIndex;
  final controller;
  const OnbordingTopBarButtons(
      {super.key,
      required this.controller,
      required this.currentIndex,
      required this.updateIndex});

  @override
  State<OnbordingTopBarButtons> createState() => _OnbordingTopBarButtonsState();
}

class _OnbordingTopBarButtonsState extends State<OnbordingTopBarButtons> {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(top: 20),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          widget.currentIndex != 0
              ? TextButton(
                  onPressed: () {
                    widget.updateIndex(widget.currentIndex - 1);
                    widget.controller.previousPage(
                      duration: const Duration(milliseconds: 80),
                      curve: Curves.bounceIn,
                    );
                  },
                  child: const Text(
                    "Previous",
                    style: TextStyle(color: primaryColor),
                  ),
                )
              : Text(''),
          widget.currentIndex != 2
              ? TextButton(
                  onPressed: () {
                    widget.updateIndex(widget.currentIndex + 1);
                    widget.controller.nextPage(
                      duration: const Duration(milliseconds: 80),
                      curve: Curves.bounceIn,
                    );
                  },
                  child: const Text(
                    "skip",
                    style: TextStyle(color: primaryColor),
                  ),
                )
              : const Text(''),
        ],
      ),
    );
  }
}
