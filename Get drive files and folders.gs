function generateFolderTreeFn(startFolderId,useRootFolder,exportFormat) {
  var fullFileName = []; // Full path
  var FileNames = [];
  var FileUrls = [];
  var FileDownloadLinks = [];
  var FolderNames = []; //Containing folder name
  var FolderUrl = []; //Containing folder link
  var Date_createds = [];
  var Descriptions = [];
  var Editors = [];
  var FileIds = [];
  var LastUpdateds = [];
  var FileMimeTypes = [];
  var Owners = [];
  var Parents = [];
  var SharingAccesss = [];
  var SharingPermissions = [];
  var Sizes = [];
  var Viewers = [];
  var IsShareables = [];
  var IsStarreds = [];
  var IsTrashed = [];

  var exportFormat = exportFormat || "xlsx";
  var useRootFolder = useRootFolder || false;
  if(useRootFolder == false) {
    var startFolderId = startFolderId || '0BztWT4i_TsQESndDMHBMekI1a28';
    var parentFolder = DriveApp.getFolderById(startFolderId); //outcome 3
  } else if(useRootFolder == true) {
    var parentFolder = DriveApp.getRootFolder();
  }

  var parentFolderName = parentFolder.getName();
  var cyclicalFolderNameOld = '';
  function getChildFolders(parentFolder,FolderNames,FolderUrl,FileNames,fullFileName,cyclicalFolderName,cyclicalFolderNameOld,childFolderName,FileUrls,FileDownloadLinks,Date_createds,Descriptions,Editors,FileIds,LastUpdateds,FileMimeTypes,Owners,Parents,SharingAccesss,SharingPermissions,Sizes,Viewers,IsShareables,IsStarreds,IsTrashed,exportFormat) {
  var childFolders = parentFolder.getFolders();
  cyclicalFolderNameOld =  cyclicalFolderNameOld + '/' + childFolderName;
  while (childFolders.hasNext()) {
    var childFolder = childFolders.next();
    var childFolderName = childFolder.getName();
    var cyclicalFolderName = cyclicalFolderNameOld + '/' + childFolderName;
    var files = childFolder.getFiles();
    while (files.hasNext()) {
      var File = files.next();
      var FileName = File.getName();
      fullFileName.push(cyclicalFolderName + '/' + FileName);
      FileNames.push(FileName);
      var FileUrl = File.getUrl();
      FileUrls.push(FileUrl);
      var FileDownloadLink = "https://docs.google.com/spreadsheets/d/1xc8BjZP_rtNOtA5Jw_NfbgIlgyt5-UN4ZHghekK9w34/export?format=" +exportFormat + "&id=" + File.getId();
      FileDownloadLinks.push(FileDownloadLink);
      FolderNames.push(cyclicalFolderName);
      FolderUrl.push(childFolder.getUrl());
      var Date_created = File.getDateCreated();
      Date_createds.push(Date_created);
      var Description = File.getDescription();
      Descriptions.push(Description);
      var Editor = File.getEditors().map(function(user) {return user.getEmail()}).join(", ");
      Editors.push(Editor);
      var FileId = File.getId();
      FileIds.push(FileId);
      var LastUpdated = File.getLastUpdated();
      LastUpdateds.push(LastUpdated);
      var FileMimeType = File.getMimeType();
      FileMimeTypes.push(FileMimeType);
      var Owner = File.getOwner().map(function(user) {return user.getEmail()}).join(", ");
      Owners.push(Owner);
      var Parent = File.getParents();
      Parents.push(Parent);
      var SharingAccess = File.getSharingAccess();
      SharingAccesss.push(SharingAccess);
      var SharingPermission = File.getSharingPermission();
      SharingPermissions.push(SharingPermission);
      var Size = File.getSize();
      Sizes.push(Size);
      var Viewer = File.getViewers().map(function(user) {return user.getEmail()}).join(", ");
      Viewers.push(Viewer);
      var IsShareable = File.isShareableByEditors();
      IsShareables.push(IsShareable);
      var IsStarred = File.isStarred();
      IsStarreds.push(IsStarred);
      var IsTrashed_var = File.isTrashed();
      IsTrashed.push(IsTrashed_var);
    }
    getChildFolders(childFolder,FolderNames,FolderUrl,FileNames,fullFileName,cyclicalFolderName,cyclicalFolderNameOld,childFolderName,FileUrls,FileDownloadLinks,Date_createds,Descriptions,Editors,FileIds,LastUpdateds,FileMimeTypes,Owners,Parents,SharingAccesss,SharingPermissions,Sizes,Viewers,IsShareables,IsStarreds,IsTrashed,exportFormat);
  }
}


  getChildFolders(parentFolder,FolderNames,FolderUrl,FileNames,fullFileName,cyclicalFolderName = null,cyclicalFolderNameOld,parentFolderName,FileUrls,FileDownloadLinks,Date_createds,Descriptions,Editors,FileIds,LastUpdateds,FileMimeTypes,Owners,Parents,SharingAccesss,SharingPermissions,Sizes,Viewers,IsShareables,IsStarreds,IsTrashed);
  var headers = ["fullFileName","FileNames","FileUrls","FileDownloadLinks","FolderNames","FolderUrl","Date_createds","Descriptions","Editors","FileIds","LastUpdateds","FileMimeTypes","Owners","Parents","SharingAccesss","SharingPermissions","Sizes","Viewers","IsShareables","IsStarreds","IsTrashed"];
  var allData = DHIS2ReportingRateGAS20190314.transpose([fullFileName,FileNames,FileUrls,FileDownloadLinks,FolderNames,FolderUrl,Date_createds,Descriptions,Editors,FileIds,LastUpdateds,FileMimeTypes,Owners,Parents,SharingAccesss,SharingPermissions,Sizes,Viewers,IsShareables,IsStarreds,IsTrashed]);
  allData.unshift(headers);
  return allData;
}

function generateFolderTree() {
  var allData = generateFolderTreeFn();
  SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1xc8BjZP_rtNOtA5Jw_NfbgIlgyt5-UN4ZHghekK9w34/edit').getSheetByName('Sheet1').getRange(1, 1, allData.length, allData[0].length).setValues(allData);
}


