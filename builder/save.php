<?php

/* CONFIG */

$pathToAssets = array("elements/images/uploads");

$filename = "../your-custom-pages/website.zip"; //use the /tmp folder to circumvent any permission issues on the root folder

/* END CONFIG */
	

$zip = new ZipArchive();

$zip->open($filename, ZipArchive::CREATE);


//add folder structure

foreach( $pathToAssets as $thePath ) {

	// Create recursive directory iterator
	$files = new RecursiveIteratorIterator(
    	new RecursiveDirectoryIterator( $thePath ),
    	RecursiveIteratorIterator::LEAVES_ONLY
	);

	foreach ($files as $name => $file) {
	
		if( $file->getFilename() != '.' && $file->getFilename() != '..' ) {
    		// Get real path for current file
    		$filePath = $file->getRealPath();
    		$temp = explode("/", $name);
    		array_shift( $temp );
    		$newName = implode("/", $temp);
    		// Add current file to archive
    		$zip->addFile($filePath, $newName);
    	
    	} 
	}

}
	
foreach( $_POST['pages'] as $page=>$content ) {
		$zip->addFromString($page.".html", $_POST['doctype']."\n".stripslashes($content));
}

$zip->close();

if ($zip->open($filename, ZipArchive::CREATE) === TRUE) {
    $zip->extractTo('../your-custom-pages/');
    $zip->close();
} 


$yourfile = $filename;
$file_name = basename($yourfile);

header("Content-Type: application/zip");
header("Content-Transfer-Encoding: Binary");
header("Content-Disposition: attachment; filename=$file_name");
header("Content-Length: " . filesize($yourfile));
readfile($yourfile);
unlink('../your-custom-pages/website.zip');

exit;
?>