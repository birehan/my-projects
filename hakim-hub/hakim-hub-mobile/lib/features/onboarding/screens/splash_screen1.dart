import 'package:flutter/material.dart';
import 'package:hakim_hub_mobile/core/utils/colors.dart';
import 'package:hakim_hub_mobile/core/utils/ui_converter.dart';
import '../widgets/build_dots.dart';
import '../widgets/custom_button.dart';
import '../widgets/top_bar_bottons.dart';
import '../widgets/pages.dart';

class OnBordingPage extends StatefulWidget {
  const OnBordingPage({super.key});

  @override
  State<OnBordingPage> createState() => _OnBordingPageState();
}

class _OnBordingPageState extends State<OnBordingPage> {
  int currentIndex = 0;
  final PageController _controller = PageController(initialPage: 0);

  void updateIndex(index) {
    setState(() {
      currentIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: secondryTextColor,
      body: Padding(
        padding: const EdgeInsets.all(15),
        child: Column(
          children: [
            Expanded(
              child: PageView.builder(
                controller: _controller,
                itemCount: pages.length,
                onPageChanged: (value) => updateIndex(value),
                itemBuilder: (BuildContext context, int index) {
                  return Column(
                    children: [
                      OnbordingTopBarButtons(
                          currentIndex: currentIndex,
                          updateIndex: updateIndex,
                          controller: _controller),
                      SizedBox(
                        height: UIConverter.getComponentHeight(context, 120),
                      ),
                      SizedBox(
                        height: UIConverter.getComponentHeight(context, 245),
                        width: UIConverter.getComponentWidth(context, 350),
                        child: Image(
                          image: AssetImage('assets/images/${pages[index][0]}'),
                        ),
                      ),
                      SizedBox(
                          height: UIConverter.getComponentHeight(context, 20)),
                      Text(
                        pages[index][1],
                        style: const TextStyle(
                            fontSize: 24, fontWeight: FontWeight.w700),
                      ),
                      const SizedBox(
                        height: 10,
                      ),
                      Text(
                        pages[index][2],
                        textAlign: TextAlign.center,
                        style: const TextStyle(
                            fontSize: 16, fontWeight: FontWeight.w400),
                      ),
                    ],
                  );
                },
              ),
            ),
            CustomButton(
                currentIndex: currentIndex,
                updateIndex: updateIndex,
                pages: pages,
                context: context,
                controller: _controller),
            Padding(
              padding: const EdgeInsets.only(bottom: 100),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: List.generate(
                  pages.length,
                  (index) => buildDots(
                      currentIndex: currentIndex,
                      index: index,
                      context: context),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
