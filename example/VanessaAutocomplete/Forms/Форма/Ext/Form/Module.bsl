﻿&НаСервере
Процедура ПриСозданииНаСервере(Отказ, СтандартнаяОбработка)
	
	ОбработкаОбъект = РеквизитФормыВЗначение("Объект");
	
	МакетРедактора = ОбработкаОбъект.ПолучитьМакет("VanessaEditor");
	АдресРедактора = ПоместитьВоВременноеХранилище(МакетРедактора, УникальныйИдентификатор);
	VanessaEditor = ПолучитьНавигационнуюСсылкуИнформационнойБазы() + "/" + АдресРедактора;
	
	МакетСпискаШагов = ОбработкаОбъект.ПолучитьМакет("VanessaStepList");
	VanessaStepList = ПоместитьВоВременноеХранилище(МакетСпискаШагов, УникальныйИдентификатор);
	
КонецПроцедуры

&НаКлиенте
Процедура VanessaEditorДокументСформирован(Элемент)
	
	ДвоичныеДанные = ПолучитьИзВременногоХранилища(VanessaStepList);
	Поток = ДвоичныеДанные.ОткрытьПотокДляЧтения();
	ЧтениеТекста = Новый ЧтениеТекста(Поток, КодировкаТекста.UTF8);
	Текст = ЧтениеТекста.Прочитать();
	
	Элементы.VanessaEditor.Документ.defaultView.setVanessaStepList(Текст);
	Элементы.VanessaEditor.Документ.defaultView.createVanessaEditor();
	
КонецПроцедуры

