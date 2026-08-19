Set WshShell = CreateObject("WScript.Shell")
' Run python server.py silently in the background with zero visible windows (window style 0)
WshShell.CurrentDirectory = CreateObject("Scripting.FileSystemObject").GetParentFolderName(WScript.ScriptFullName)
WshShell.Run "python server.py", 0, False
