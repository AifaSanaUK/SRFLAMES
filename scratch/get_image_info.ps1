Add-Type -AssemblyName System.Drawing
$files = Get-ChildItem "c:\projects\SRFLAMES\frontend\src\assets"
foreach ($file in $files) {
    if ($file.Name -like "*hero*") {
        try {
            $img = [System.Drawing.Image]::FromFile($file.FullName)
            Write-Output "$($file.Name): Size = $($file.Length) bytes ($([Math]::Round($file.Length/1024, 2)) KB), Dimensions = $($img.Width) x $($img.Height) pixels"
            $img.Dispose()
        } catch {
            # Fallback to Shell.Application for files like .webp that may not be supported by System.Drawing
            $shell = New-Object -ComObject Shell.Application
            $folder = $shell.NameSpace($file.DirectoryName)
            $item = $folder.ParseName($file.Name)
            $dims = $folder.GetDetailsOf($item, 31)
            # Sometimes Dimensions in shell contains extra unicode characters or formatting, let's clean/print it
            $dimsCleaned = $dims -replace '[^\d x\?]', ''
            Write-Output "$($file.Name): Size = $($file.Length) bytes ($([Math]::Round($file.Length/1024, 2)) KB), Dimensions = $dimsCleaned"
        }
    }
}
