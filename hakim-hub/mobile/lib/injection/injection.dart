import 'package:get_it/get_it.dart';

import 'package:hakim_hub_mobile/injection/search_hospitals_injection.dart';

import 'chat_bot_injection.dart';
import 'doctor_detail_injection.dart';
import 'hospital_detail_injection.dart';

final sl = GetIt.instance;

Future<void> init() async {
  await searchHospitalsinit(sl);
  await doctorDetailInit(sl);
  await hospitalDetailsinit(sl);
  await chatBotInit(sl);
}
