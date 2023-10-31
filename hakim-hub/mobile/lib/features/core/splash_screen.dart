import 'package:flutter/material.dart';

class SplashPage extends StatelessWidget {
  const SplashPage({super.key});

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: SafeArea(
        child: Center(
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Image(
                image: AssetImage("assets/images/HakimHubVectorImg.png"),
              ),
              SizedBox(width: 15),
              Image(
                image: AssetImage("assets/images/HakimHub.png"),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
