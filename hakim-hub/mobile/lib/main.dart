import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:hakim_hub_mobile/features/chatbot/presentation/bloc/chat_bot_bloc.dart';
import 'package:hakim_hub_mobile/router/main_router.dart';
import 'package:hakim_hub_mobile/router/routes.dart';
import 'package:responsive_sizer/responsive_sizer.dart';

import 'features/core/sharedPreference.dart';
import 'features/doctor/presentation/bloc/doctor_detail_bloc.dart';
import 'features/hospital/presentation/bloc/bloc/hospital_detail_bloc.dart';
import 'features/hospital/presentation/bloc/bloc/search_hospital_bloc.dart';

import 'injection/injection.dart' as injection;

void main() async {
  WidgetsFlutterBinding.ensureInitialized(); // Initialize Flutter bindings

  await injection.init();
  bool intialLocation = await ShardPrefHelper.getIsOpened();
  String curLocation = AppRoutes.SplashPage;
  if (intialLocation == true) {
    print("object");
    curLocation = AppRoutes.Home;
    print(curLocation);
    print("object");
  }

  runApp(MyApp(curLocation: curLocation));
}

class MyApp extends StatefulWidget {
  String curLocation;
  MyApp({super.key, required this.curLocation});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  @override
  void initState() {
    super.initState();
    SystemChrome.setPreferredOrientations([
      DeviceOrientation.portraitUp,
      DeviceOrientation.portraitDown,
    ]);
  }

  @override
  dispose() {
    SystemChrome.setPreferredOrientations([
      DeviceOrientation.portraitDown,
      DeviceOrientation.portraitUp,
    ]);
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return ResponsiveSizer(
      builder: (context, orientation, screenType) {
        return MultiBlocProvider(
            providers: [
              BlocProvider<SearchHospitalBloc>(
                create: (context) => injection.sl<SearchHospitalBloc>()
                  ..add(const GetAllHospitalsEvent()),
              ),
              BlocProvider<DoctorDetailBloc>(
                create: (context) => injection.sl<DoctorDetailBloc>(),
              ),
              BlocProvider<HospitalDetailBloc>(
                create: (context) => injection.sl<HospitalDetailBloc>(),
              ),
              BlocProvider<ChatBotBloc>(
                create: (context) => injection.sl<ChatBotBloc>(),
              ),
            ],
            child: RouterMain(
              intial: widget.curLocation,
            ));
      },
    );
  }
}
