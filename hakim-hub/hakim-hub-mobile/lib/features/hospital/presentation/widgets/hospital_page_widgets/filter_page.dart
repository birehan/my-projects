import 'package:flutter/material.dart';
import 'package:hakim_hub_mobile/core/utils/colors.dart';
import 'package:hakim_hub_mobile/core/utils/icons.dart';
import 'package:hakim_hub_mobile/core/utils/ui_converter.dart';

import '../../../../../core/shared_widgets/formfield.dart';
import '../../../domain/entities/filter_hospital_domain.dart';
import '../build_chips_widget.dart';



class FilterPage extends StatefulWidget {
  List<String> filterList;
  FilterPage({super.key, required this.filterList});

  @override
  State<FilterPage> createState() => _FilterPageState();
}

class _FilterPageState extends State<FilterPage> {
  bool isSwitched = false;
  int sliderValue = 10;
  
  List<String> selectedList = [];

  void delete(String serviceName) {
    setState(() {
      selectedList.remove(serviceName);
    });
  }

  void add(String serviceName) {
    setState(() {
      selectedList.add(serviceName);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.only(
        top: UIConverter.getComponentHeight(context, 35),
        left: UIConverter.getComponentWidth(context, 27),
        right: UIConverter.getComponentWidth(context, 27),
      ),
      decoration: const BoxDecoration(
        color: secondryTextColor,
        borderRadius: BorderRadius.only(
          topLeft: Radius.circular(20),
          topRight: Radius.circular(20),
        ),
      ),
      height: UIConverter.getComponentHeight(context, 650),
      child: SingleChildScrollView(
        physics: const AlwaysScrollableScrollPhysics(),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                GestureDetector(
                  child: cancel,
                  onTap: () {
                    Navigator.pop(context);
                  },
                ),
                const Text(
                  "Filter Hospitals",
                  style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.w700,
                      color: titleTextColor),
                ),
                GestureDetector(
                  child: check,
                  onTap: () {
                    FilterHospitalDomain filterHospitalModel = FilterHospitalDomain(operationYears: sliderValue, openStatus: isSwitched, services: selectedList);
                    Navigator.pop(context, filterHospitalModel);
                  },
                )
              ],
            ),
            Row(
              children: [
                const Text(
                  "Open Now",
                  style: TextStyle(
                    color: primaryColor,
                    fontSize: 20,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                SizedBox(
                  width: UIConverter.getComponentWidth(context, 32),
                ),
                Switch(
                  value: isSwitched,
                  onChanged: (value) {
                    setState(() {
                      isSwitched = value;
                    });
                  },
                  activeTrackColor: secondaryColor,
                  activeColor: primaryColor,
                  inactiveThumbColor: primaryColor,
                  inactiveTrackColor: secondryTextColor,
                  trackOutlineColor: MaterialStateColor.resolveWith(
                    (states) => primaryColor,
                  ),
                )
              ],
            ),
            SizedBox(
              height: UIConverter.getComponentHeight(context, 10),
            ),
            const Text(
              "Active for",
              style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.w600,
                  color: primaryColor),
            ),
            SizedBox(
              height: UIConverter.getComponentHeight(context, 20),
            ),
            SliderTheme(
              data: const SliderThemeData(
                activeTrackColor: primaryColor,
                inactiveTrackColor: backgroundColor,
                trackShape: RoundedRectSliderTrackShape(),
                trackHeight: 4.0,
                thumbShape: RoundSliderThumbShape(
                    enabledThumbRadius: 12.0, elevation: 5),
                thumbColor: secondaryColor,
                overlayShape: RoundSliderOverlayShape(overlayRadius: 28.0),
                tickMarkShape: RoundSliderTickMarkShape(),
                activeTickMarkColor: primaryColor,
                inactiveTickMarkColor: greyColor,
                valueIndicatorShape: PaddleSliderValueIndicatorShape(),
                valueIndicatorColor: primaryColor,
                valueIndicatorTextStyle: TextStyle(
                  color: secondryTextColor,
                ),
              ),
              child: SizedBox(
                width: UIConverter.getComponentWidth(context, 376),
                child: Slider(
                  value: sliderValue.toDouble(),
                  min: 1,
                  max: 200,
                  divisions: 20,
                  label: '${sliderValue.round()} years',
                  onChanged: (double value) {
                    setState(() {
                      sliderValue = value.round();
                    });
                  },
                ),
              ),
            ),
            SizedBox(
              height: UIConverter.getComponentHeight(context, 20),
            ),
            const Text(
              "Services",
              style: TextStyle(
                  fontSize: 25,
                  fontWeight: FontWeight.w600,
                  color: primaryColor),
            ),
            SizedBox(
              height: UIConverter.getComponentHeight(context, 20),
            ),
            Wrap(
              spacing: 6.0,
              runSpacing: 6.0,
              children: widget.filterList
                  .map((e) => BuildChip(
                        label: e,
                        onDeleted: (serviceName) => delete(serviceName),
                        onAdd: (serviceName) => add(serviceName),
                      ))
                  .toList(),
            ),
          ],
        ),
      ),
    );
  }
}
