<tr>
<td class="header">
<a href="{{ $url }}" style="display: inline-block;">
@if (trim($slot) === 'Laravel')
<img style="width: 150px; height: 150px" src="{{ url('/').'/img/logo.png' }}" class="logo" alt="kaoban">
@else
{{ $slot }}
@endif
</a>
</td>
</tr>
